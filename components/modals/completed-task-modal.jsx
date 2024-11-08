import {
  Button,
  Center,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  Text,
  ModalFooter,
  ModalBody,
} from "@gluestack-ui/themed";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import DeerSvg from "../../assets/svg/deer";

export function CompletedTaskModal({ setShowModal }) {
  const { t } = useTranslation();
  const ref = useRef(null);
  return (
    <Center>
      <Modal
        isOpen={true}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader justifyContent="center">
            <Heading size="md">{t("screens.completedTaskModal.title")}</Heading>
          </ModalHeader>
          <ModalBody>
            <Center>
              <Text size="sm">{t("screens.completedTaskModal.text")}</Text>
            </Center>
            <Center mt="$10" mb="$5">
              <DeerSvg />
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius="$lg"
              width="100%"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>{t("screens.completedTaskModal.btn")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
