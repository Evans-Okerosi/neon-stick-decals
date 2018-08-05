export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';

export function uploadImageFailure(error) {
    return {
      type: UPLOAD_IMAGE_FAILURE,
      error,
    };
  }
  export function uploadImageSuccess(imageId, response) {
    return {
      type: UPLOAD_IMAGE_SUCCESS,
      response,
      imageId
    };
  }
  export function uploadImage(imageId) {
    return {
      type: UPLOAD_IMAGE,
      imageId
    };
  }