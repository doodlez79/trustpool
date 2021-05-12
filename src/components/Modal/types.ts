export interface ModalComponentProps {
  modalVisible: boolean;
  setModalVisible: () => void;

  position?: POSITION_TYPE;
  KeyboardAvoidingViewParam?: boolean
  width?: number | string;
  mb?: number;
  backdropColor?: string;
  moreBorder?: boolean
}

export enum POSITION_TYPE {
  CENTER = 'center',
  END = 'flex-end',
  START = 'flex-start',
}
