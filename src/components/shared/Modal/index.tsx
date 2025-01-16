import React from 'react';

type ModalProps = {
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: string | React.ReactNode;
};

const Modal = ({ onClose, onSubmit, title, body }: ModalProps) => {
    return (
        <>
            <div className='modal' style={{ display: 'block' }} role='dialog'>
                <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {title && <h5 className='modal-title'>{title}</h5>}
                            <button
                                type='button'
                                className='btn-close'
                                onClick={onClose}
                                aria-label='Close'
                            />
                        </div>
                        {body && <div className='modal-body'>{body}</div>}
                        <div className='modal-footer justify-content-between px-5'>
                            <button type='button' className='btn btn-secondary' onClick={onClose}>
                                Отмена
                            </button>
                            <button type='button' className='btn btn-primary' onClick={onSubmit}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className='modal-backdrop fade show'
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
                onClick={onClose}
            />
        </>
    );
};

export default Modal;
