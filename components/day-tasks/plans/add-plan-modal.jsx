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
} from "@gluestack-ui/themed";
import { useTranslation } from "react-i18next";

export function AddPlanModal({
  setShowModal,
  handleAddPlan,
  data,
  handleUpdatePlan,
}) {
  const { t } = useTranslation();
  const [text, setText] = useState(data?.text ?? "");

  const isEditMode = Boolean(data);

  function handleSubmit() {
    if (text.trim()) {
      isEditMode ? handleUpdatePlan(data.id, text) : handleAddPlan(text);
      setText("");
      setShowModal(false);
    }
  }

  return (
    <Modal
      isOpen
      onClose={() => {
        setShowModal(false);
      }}
    >
      <ModalBackdrop />
      <ModalContent width="90%">
        <ModalHeader mb={10}>
          <Text>{t("screens.plansModal.addPlanTitle")}</Text>
        </ModalHeader>
        <ModalBody>
          <Textarea w="100%" size="md" mb={10}>
            <TextareaInput
              onChangeText={setText}
              defaultValue={text}
              placeholder={t("screens.plansModal.placeholder")}
            />
          </Textarea>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            size="sm"
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
  );
}
