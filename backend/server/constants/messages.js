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

export const PLACES_MESSAGES = {
  SEARCH_INPUT_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Search input'),
  PLACE_ID_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Place id'),
  SEARCH_INPUT_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Search input'),
  SEARCH_INPUT_LENGTH_ERROR: 'Search input must be at least 3 characters',
  SEARCH_SUCCESSFUL: 'Place search successful',
};

export const RESTAURANTS_MESSAGES = {
  GET_ALL_SUCCESS: 'Restaurants fetched successfully',
  GET_SUCCESS: 'Restaurant fetched successfully',
  CREATE_SUCCESS: 'Restaurant created successfully',
  UPDATE_SUCCESS: 'Restaurant updated successfully',
  DELETE_SUCCESS: 'Restaurant deleted successfully',
  RESTAURANT_NOT_FOUND: 'Restaurant not found',

  ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Restaurant Id'),
  NAME_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Name'),
  DESCRIPTION_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Description'),
  LATITUDE_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Latitude'),
  LONGITUDE_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Longitude'),
  PLACE_ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Place id'),
  CONTACT_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace(
    '{field}',
    'Contact should be in (XXX) XXX-XXX-XXXX format',
  ),

  NAME_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Name'),
  DESCRIPTION_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Description'),
  LATITUDE_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Latitude'),
  LONGITUDE_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Longitude'),
  PLACE_ID_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Place id'),
  CONTACT_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Contact'),

  PLACE_ID_ALREADY_EXISTS: COMMON_VALIDATIONS.FIELD_ALREADY_EXISTS.replace('{field}', 'Place id'),
};

export const REVIEW_MESSAGES = {
  GET_ALL_SUCCESS: 'Reviews fetched successfully',
  GET_SUCCESS: 'Review fetched successfully',
  CREATE_SUCCESS: 'Review created successfully',
  UPDATE_SUCCESS: 'Review updated successfully',
  DELETE_SUCCESS: 'Review deleted successfully',
  RESTAURANT_NOT_FOUND: 'Review not found',

  ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Review Id'),
  RESTAURANT_ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Restaurant id'),
  USER_ID_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'User id'),
  COMMENT_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Comment'),
  RATING_IS_INVALID: COMMON_VALIDATIONS.FIELD_IS_INVALID.replace('{field}', 'Rating'),

  RESTAURANT_ID_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace(
    '{field}',
    'Restaurant id',
  ),
  USER_ID_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'User id'),
  COMMENT_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Comment'),
  RATING_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Rating'),

  RESTAURANT_ID_CANNOT_BE_UPDATED: 'Restaurant id cannot be updated',
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
  IMAGE_SIZE_ERROR: 'Image should be less than 20MB',
  IMAGE_TYPE_ERROR: 'Only png, jpg and jpeg types are allowed',
  IMAGE_IS_REQUIRED: COMMON_VALIDATIONS.FIELD_IS_REQUIRED.replace('{field}', 'Image'),
};
