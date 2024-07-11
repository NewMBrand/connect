import { ConfirmationModal } from './ConfirmationModal';
import { CreateDocumentModal } from './CreateDocumentModal';
import { DebugSettingsModal } from './DebugSettingsModal';
import { DeleteDriveModal } from './DeleteDriveModal';
import { DeleteItemModal } from './DeleteItemModal';
import { SettingsModal } from './SettingsModal';
import { UpgradeDriveModal } from './UpgradeDriveModal';

export const modals = {
    deleteItem: DeleteItemModal,
    upgradeDrive: UpgradeDriveModal,
    createDocument: CreateDocumentModal,
    settingsModal: SettingsModal,
    confirmationModal: ConfirmationModal,
    deleteDriveModal: DeleteDriveModal,
    debugSettingsModal: DebugSettingsModal,
} as const;

export type Modals = typeof modals;

export type ModalType = keyof Modals;

export type ModalPropsMapping = {
    [K in ModalType]: React.ComponentProps<Modals[K]>;
};
