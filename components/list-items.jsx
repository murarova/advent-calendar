import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  ButtonIcon,
} from "@gluestack-ui/themed";
import { EditIcon, Trash2 } from "lucide-react-native";

export function ListItems({ plans }) {
  return (
    <VStack width="100%" space="sm" mb={30} mt={10}>
      {plans.map((item, index) => (
        <HStack
          key={item.id}
          justifyContent="space-between"
          alignItems="center"
        >
          <HStack>
            <Text>{index + 1}. </Text>
            <Text>{item.text}</Text>
          </HStack>
          <HStack>
            <Button borderRadius="$full" size="sm" mr="$1">
              <ButtonIcon as={EditIcon} />
            </Button>

            <Button borderRadius="$full" size="sm">
              <ButtonIcon as={Trash2} />
            </Button>
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
}
