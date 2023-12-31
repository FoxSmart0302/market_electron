import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, serverURL, toastr } from '../config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const ClientDeleteModal = ({ preid, is_deleted, setDelete, initPage }) => {
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [item, setItem] = useState('');
    const navigate = useNavigate();
    const handleClose = (event: any) => {
        event.preventDefault();
        setDelete(false);
    }

    const handleSave = (event: any) => {
        event.preventDefault();
        axios.post(serverURL + '/api/client/delete', { id: preid })
            .then(res => {
                const data = res.data;
                if(!data.status) {
                    initPage();
                    setDelete(false);
                    toastr.success('It was succefully deleted!');
                  
                }
            })
            .catch((error) => {
                navigate('/member/auth/signin');
            })
    }

    return (
        <>
            <div
                x-show="modalOpen"
                x-transition="1s"
                className="fixed top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 dialoganim"
                style={is_deleted ? {} : { display: 'none' }}
            >
                <div className="w-full max-w-142.5 rounded-lg bg-white py-12 px-8 text-center dark:bg-boxdark md:py-15 md:px-17.5">
                    <div className="swal2-icon swal2-warning swal2-animate-warning-icon">
                        <span className="swal2-icon-text">!</span>
                    </div>
                    {/* <span className="mx-auto mb-6 inline-block h-1 w-35 rounded bg-primary"></span> */}

                    <div className='mb-5.5' style={{ textAlign: 'center' }}>
                        <div style={{ paddingBottom: '10px', fontSize: '35px' }}>Are you sure?</div>
                        <div className='block text-danger' style={{ paddingBottom: '10px', fontSize: '23px' }}>This will delete data from server</div>

                        <label
                            className="text-left mb-0 block text-sm font-medium mt-2 text-danger"
                            htmlFor="item"
                        >
                            {isEmpty(error) ? '' : error}
                        </label>
                    </div>

                    <div className="flex justify-center gap-4.5">
                        <button
                            className="btn-neffect justify-center rounded py-2 px-6 font-medium text-gray hover:shadow-1" style={{ backgroundColor: 'red' }}
                            onClick={handleSave}
                        >
                            Delete
                        </button>
                        <button
                            className="btn-peffect justify-center rounded border border-stroke py-2 px-6 font-medium  hover:shadow-1 dark:border-strokedark dark:text-white" style={{ color: 'cornflowerblue' }}
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ClientDeleteModal;