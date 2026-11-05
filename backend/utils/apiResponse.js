export const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  const payload = {
    success: true,
    message,
  };

  if (data !== null && data !== undefined) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
};

export const errorResponse = (res, statusCode = 500, message = 'Something went wrong') => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

