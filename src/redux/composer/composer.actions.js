import ComposerActionTypes from './composer.types';

export const updateColor = color => ({
  type: ComposerActionTypes.UPDATE_COLOR,
  payload: color
})