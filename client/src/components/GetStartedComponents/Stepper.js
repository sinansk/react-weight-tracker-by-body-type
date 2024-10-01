import React from 'react';

const Stepper = ({ activeStep, setActiveStep, checkFormValid }) => {

    const handleStepClick = async (step) => {
        if (step > 1) {
            const isValid = await checkFormValid(step - 1)
            if (isValid) {
                setActiveStep(step)
            }
        } else {
            const isValid = await checkFormValid(step)
            if (isValid) {
                setActiveStep(step)
            }
        }
    };

    return (
        <div className="lg:p-4 w-[80vw] lg:w-[50vw] mx-auto">
            <div className="flex items-center ">
                <div className="relative flex items-center ">
                    <div data-step="0" className={`${activeStep === 1 && `stepper-active`} ${activeStep > 1 && `stepper-prev`}  stepper`} onClick={() => handleStepClick(1)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-bookmark"
                        >
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div className={`${activeStep >= 1 ? `text-cyan-400` : `text-gray-400`} stepper-text`}>STEP 1</div>
                </div>
                <div className={`${activeStep >= 2 ? `border-cyan-400` : `border-gray-400`} stepper-line `}></div>
                <div className="relative flex items-center ">
                    <div data-step="1" className={`${activeStep === 2 && `stepper-active`} ${activeStep > 2 && `stepper-prev`} stepper`} onClick={() => handleStepClick(2)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>
                    <div className={`${activeStep >= 2 ? `text-cyan-400` : `text-gray-400`} stepper-text`}>STEP 2</div>
                </div>
                <div className={`${activeStep >= 3 ? `border-cyan-400` : `border-gray-400`} stepper-line`}></div>
                <div className="relative flex items-center ">
                    <div data-step="2" className={`${activeStep === 3 && `stepper-active`} ${activeStep > 3 && `stepper-prev`} grid content-center stepper`} onClick={() => handleStepClick(3)}>
                        <svg className="m-auto " width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r=".5" fill="currentColor" />  <circle cx="12" cy="12" r="7" />  <line x1="12" y1="3" x2="12" y2="5" />  <line x1="3" y1="12" x2="5" y2="12" />  <line x1="12" y1="19" x2="12" y2="21" />  <line x1="19" y1="12" x2="21" y2="12" /></svg>
                    </div>
                    <div className={`${activeStep >= 3 ? `text-cyan-400` : `text-gray-400`} stepper-text`}>STEP 3</div>
                </div>
                <div className={`${activeStep >= 4 ? `border-cyan-400` : `border-gray-400`} stepper-line `}></div>
                <div className="relative flex items-center ">
                    <div data-step="3" className={`${activeStep === 4 && `stepper-active`} stepper`} onClick={() => handleStepClick(4)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            height="100%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-database"
                        >
                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                    </div>
                    <div className={`${activeStep >= 4 ? `text-cyan-400` : `text-gray-400`} stepper-text`}>Confirm</div>
                </div>
            </div>
        </div>
    );
};

export default Stepper;