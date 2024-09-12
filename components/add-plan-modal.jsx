// @ts-nocheck
import { useState } from "react";
import {
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  Textarea,
  TextareaInput,
  ButtonText,
  Center,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Button,
  Input,
  InputField,
  HStack,
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

export function AddPlanModal({ setShowModal, handleAddPlan }) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  function handleSubmit() {
    if (text.trim()) {
      handleAddPlan(text);
      setText("");
      setShowModal(false);
    }
  }

  return (
    <Center h={300}>
      <Modal
        isOpen
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop />

        <ModalContent>
          <ModalHeader mt={30}>
            <Text>{t("screens.plansModal.addPlanTitle")}</Text>
          </ModalHeader>
          <ModalBody>
            <VStack width="100%" space="sm" mb={10} mt={10}>
              {/* //TODO: replace to textarea */}
              <Input w="100%" size="md" mb={10}>
                <InputField
                  onChangeText={setText}
                  value={text}
                  placeholder={t("screens.plansModal.placeholder")}
                />
              </Input>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>{t("common.cancel")}</ButtonText>
            </Button>
            <Button variant="solid" action="primary" onPress={handleSubmit}>
              <ButtonText>{t("common.add")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
