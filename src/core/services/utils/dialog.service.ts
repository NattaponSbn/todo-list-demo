import Swal from 'sweetalert2';

export class DialogService {
    static confirmData(t: (key: string) => string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.CONFIRM');
        const confirmText = t('DIALOG_TEXT.CONFIRM');
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmAlertText(t: (key: string) => string, text: string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.ALERT');
        const confirmText = text;
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmDeleteData(t: (key: string) => string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.DELETE');
        const confirmText = t('DIALOG_TEXT.DELETE');
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmSaveData(t: (key: string) => string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.SAVE_DATA');
        const confirmText = t('DIALOG_TEXT.SAVE_DATA');
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmSubmitData(t: (key: string) => string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.SUBMIT_DATA');
        const confirmText = t('DIALOG_TEXT.SUBMIT_DATA');
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmSaveText(t: (key: string) => string, text: string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.SAVE_DATA');
        const confirmText = text;
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmCreateData(t: (key: string) => string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.CREATE_DATA');
        const confirmText = t('DIALOG_TEXT.CREATE_DATA');
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirmTextData(t: (key: string) => string, text: string, callback: () => void) {
        const confirmTitle = t('DIALOG_TITLE.CONFIRM_DATA');
        const confirmText = text;
        this.confirm(t, confirmTitle, confirmText, callback);
    }

    static confirm(t: (key: string) => string, title: string, text: string, acceptCallback: () => void) {
        const confirmButtonText = t('BUTTON.YES');
        const cancelButtonText = t('BUTTON.NO');
        Swal.fire({
            title,
            text: t(text) ?? '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3F6AD8',
            cancelButtonColor: '#B3B3B3',
            reverseButtons: false,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        }).then((result) => {
            if (result.value) {
                acceptCallback();
            }
        });
    }

    static confirmHtml(t: (key: string) => string, title: string, html: string, text: string, acceptCallback: () => void) {
        const confirmButtonText = t('BUTTON.CONFIRM');
        const cancelButtonText = t('BUTTON.CLOSE');
        Swal.fire({
            title,
            html,
            text: t(text) ?? '',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3F6AD8',
            cancelButtonColor: '#B3B3B3',
            reverseButtons: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            padding: '2em',
            customClass: {
                popup: 'sweet-alerts'
            }
        }).then((result) => {
            if (result.value) {
                acceptCallback();
            }
        });
    }

    static warning(t: (key: string) => string, title: string, text: string, callback?: () => void) {
        Swal.fire({
            icon: 'warning',
            title: t(title) ?? '',
            text: t(text) ?? '',
            showConfirmButton: false,
            timer: 3000,
            allowOutsideClick: false,
            customClass: {
                popup: 'sweet-alerts'
            }
        }).then((result) => {
            if (result.value) {
                if (callback !== undefined) {
                    callback();
                }
            }
        });
    }

    static successProceed(t: (key: string) => string, callback?: () => void) {
        const title = t('DIALOG_TITLE.RESULT_COMPLETED');
        const text = t('DIALOG_TEXT.RESULT_COMPLETED');
        this.success(t, title, text, callback);
    }

    static success(t: (key: string) => string, title: string, text: string, callback?: () => void) {
        Swal.fire({
            icon: 'success',
            title: title,
            text: text,
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
        }).then((result) => {
            if (callback !== undefined) {
                callback();
            }
        });
    }
}
