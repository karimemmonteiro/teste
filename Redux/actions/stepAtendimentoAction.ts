export const SET_STEP = 'SET_STEP'; 

export const setStep = (step: number) => ({
  type: 'SET_STEP',
  step: SET_STEP,
  payload: step,
});
