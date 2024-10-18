import {
  Box,
  Text,
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
} from "@gluestack-ui/themed";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

export function MonthSelectModal({ onMonthSelect, setShowMonthModal }) {
  const { t } = useTranslation();

  const monthNames = [
    { short: "Січ", long: "Січень" },
    { short: "Лют", long: "Лютий" },
    { short: "Бер", long: "Березень" },
    { short: "Квіт", long: "Квітень" },
    { short: "Трав", long: "Травень" },
    { short: "Черв", long: "Червень" },
    { short: "Лип", long: "Липень" },
    { short: "Серп", long: "Серпень" },
    { short: "Вер", long: "Вересень" },
    { short: "Жовт", long: "Жовтень" },
    { short: "Лист", long: "Листопад" },
    { short: "Груд", long: "Грудень" },
  ];

  return (
    <Modal
      isOpen
      onClose={() => {
        setShowMonthModal(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader
          backgroundColor="$primary500"
          justifyContent="center"
          pb="$4"
        >
          <Text color="$white" fontWeight="600">
            {t("monthSelect.title")}
          </Text>
        </ModalHeader>
        <Box p="$4">
          <FlatList
            data={monthNames}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            keyExtractor={(item) => item.long}
            renderItem={({ item }) => (
              <Button
                width={85}
                variant="link"
                marginBottom="$3"
                onPress={() => onMonthSelect(item.long)}
              >
                <ButtonText fontWeight="400" color="$black">
                  {item.short}
                </ButtonText>
              </Button>
            )}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
}
