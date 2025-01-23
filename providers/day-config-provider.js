import {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { Alert } from "react-native";
import { END_DAY, START_DAY, TASK_CATEGORY } from "../constants/constants";
import { getConfiguration, getUserData } from "../services/services";
import i18n from "../i18n/i18n";
import { enumerateDaysBetweenDates } from "../utils/utils";

const DaysContext = createContext({
  isLoading: false,
  daysConfig: [],
  updateDayProgress: (value) => {},
  getDayConfig: (value) => ({ day: "", progress: {}, config: {} }),
});

export const DaysProvider = ({ children }) => {
  const [daysConfig, setDaysConfig] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getTaskConfig() {
      setIsLoading(true);
      try {
        const userData = await getUserData();
        const config = await getConfiguration();
        if (config) {
          const days = enumerateDaysBetweenDates(
            userData,
            config,
            i18n.resolvedLanguage,
            START_DAY,
            END_DAY
          );
          setDaysConfig(days);
        }
      } catch (error) {
        Alert.alert("Oops", "Failed to get tasks configuration");
      } finally {
        setIsLoading(false);
      }
    }
    getTaskConfig();
  }, []);

  const updateDayProgress = ({ day, dayTaskGrade, moodTaskGrade }) => {
    console.log(
      "day, dayTaskGrade, moodTaskGrade",
      day,
      dayTaskGrade,
      moodTaskGrade
    );
    setDaysConfig((prevDays) =>
      prevDays.map((d) =>
        d.day === day
          ? {
              ...d,
              progress: {
                ...d.progress,
                ...(dayTaskGrade !== undefined && { dayTaskGrade }),
                ...(moodTaskGrade !== undefined && { moodTaskGrade }),
              },
            }
          : d
      )
    );
  };

  function getDayConfig(date) {
    return daysConfig.find(({ day }) => day === date);
  }

  return (
    <DaysContext.Provider
      value={{ daysConfig, updateDayProgress, isLoading, getDayConfig }}
    >
      {children}
    </DaysContext.Provider>
  );
};

export const useDaysConfiguration = () => {
  const context = useContext(DaysContext);
  if (!context) {
    throw new Error("useDaysConfiguration must be used within a DaysProvider");
  }
  return context;
};
