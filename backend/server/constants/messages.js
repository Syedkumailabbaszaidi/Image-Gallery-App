export const AUTH_MESSAGES = {
  LOGIN_SUCCESSFUL: 'Login Successful',
  REGISTER_SUCCESSFUL: 'Registeration Successful',
  LOGOUT_SUCCESSFUL: 'Logout Successful',
  EMAIL_IS_REQUIRED: 'Email is Required',
  PASSWORD_IS_REQUIRED: 'Password is Required',
  USER_NOT_FOUND: 'User not found',
  INCORRECT_PASSWORD: 'Password is Incorrect',
  USER_ALREADY_EXISTS: 'User already Exists',
  EMAIL_ALREADY_EXISTS: 'Email already Exists',
  EMAIL_NOT_EXISTS: "Email don't exist",
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_LENGTH_ERROR: 'Password must be at least 8 characters',
  PASSWORD_CONTAINS_ATLEAST_ONE_LETTER: 'Your password must contain at least one letter.',
  PASSWORD_CONTAINS_ATLEAST_ONE_DIGIT: 'Your password must contain at least one digit.',
  PASSWORD_VALIDATION_GENERIC_ERROR:
    'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long',
};

export const NO_DATA_FOUND = 'No data found';

export const ERROR_MESSAGE = 'An error occurred';

export const ACCESS_TOKEN_EXPIRED = 'Access token has been expired';

export const ERRORS_MAPPING = {
  'jwt malformed': ACCESS_TOKEN_EXPIRED,
};

export const UNAUTHORIZED_USER = 'Unauthorized user.';

export const INVALID_TOKEN = 'Invalid token';

export const ADMIN_NOT_FOUND = 'Admin not found';

export const COMMON_VALIDATIONS = {
  FIELD_IS_REQUIRED: '{field} is required',
  FIELD_NOT_FOUND: '{field} not found',
  FIELD_ALREADY_EXISTS: '{field} already exists',
  FIELD_IS_INVALID: '{field} is invalid',
};

export const NAME_MESSAGES = {
  NAME_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Name'),
  NAME_NOT_FOUND: COMMON_VALIDATIONS.FIELD_NOT_FOUND.replace('{field}', 'Name'),
  NAME_ALREADY_EXISTS: COMMON_VALIDATIONS.FIELD_ALREADY_EXISTS.replace('{field}', 'Name'),
  NAME_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Name'),
  NAME_LENGTH_ERROR: 'Name must be at least 3 characters',
};

export const EMAIL_MESSAGES = {
  EMAIL_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Email'),
  EMAIL_NOT_FOUND: COMMON_VALIDATIONS.FIELD_NOT_FOUND.replace('{field}', 'Email'),
  EMAIL_ALREADY_EXISTS: COMMON_VALIDATIONS.FIELD_ALREADY_EXISTS.replace('{field}', 'Email'),
  EMAIL_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Email'),
  EMAIL_CANNOT_BE_UPDATED: 'Email cannot be updated',
};

export const PASSWORD_MESSAGES = {
  PASSWORD_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Password'),
  PASSWORD_NOT_FOUND: COMMON_VALIDATIONS.FIELD_NOT_FOUND.replace('{field}', 'Password'),
  PASSWORD_ALREADY_EXISTS: COMMON_VALIDATIONS.FIELD_ALREADY_EXISTS.replace('{field}', 'Password'),
  PASSWORD_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Password'),
  PASSWORD_LENGTH_ERROR: 'Password must be at least 8 characters',
  PASSWORD_CONTAINS_ATLEAST_ONE_LETTER: 'Password must contain atleast one letter.',
  PASSWORD_CONTAINS_ATLEAST_ONE_NUMBER: 'Password must contain atleast one number.',
  PASSWORD_VALIDATION_GENERIC_ERROR:
    'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long',
  PASSWORD_CANNOT_BE_UPDATED: 'Password cannot be updated',
};

export const USERS_MESSAGES = {
  GET_ALL_SUCCESS: 'Users fetched successfully',
  GET_SUCCESS: 'User fetched successfully',
  CREATE_SUCCESS: 'User created successfully',
  UPDATE_SUCCESS: 'User updated successfully',
  DELETE_SUCCESS: 'User deleted successfully',
  USER_NOT_FOUND: 'User not found',

  ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'User Id'),
  NAME_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Name'),
  EMAIL_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Email'),

  NAME_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Name'),
  EMAIL_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Email'),
  PASSWORD_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Password'),

  EMAIL_ALREADY_EXISTS: 'Email address already exists',

  NAME_LENGTH_ERROR: 'Name must be at least 3 characters',
  PASSWORD_LENGTH_ERROR: 'Password must be at least 8 characters',
};

export const IMAGE_MESSAGES = {
  FETCH_SUCCESSFULL: 'Fetched Successfully',
  TAG_SUCCESSFULL: 'Tagged Successfully',
  UPLOAD_SUCCESSFUL: 'Images uploaded Successfully',
  IMAGE_SIZE_ERROR: 'Image should be less than 20MB',
  IMAGE_TYPE_ERROR: 'Only png, jpg and jpeg types are allowed',
  IMAGE_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Image'),
  SHARE_LIMIT_EXCEED: 'Image cannot be shared more than 10 people',
  SHARE_IS_REQUIRED: 'Atleast 1 person is required to share image',
  ID_IS_INVALID: 'Image id is invalid',
  SHARED_USERS_REQUIRED: 'Please add users to share',
  IMAGE_NO_FOUND: 'Image not found',
  IMAGE_ALREADY_SHARED: 'Image already shared to user(s)',
  CANNOT_SHARE_WITH_OWNER: 'Image owner cannot be selected in tag list',
  NO_RIGHT_TO_TAG: 'You dont have rights to tag this image',
};
