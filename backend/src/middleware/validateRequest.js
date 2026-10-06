/**
 * Higher-order middleware factory that validates request body using a validator function.
 * 
 * @param {(body: any) => Record<string, string>} validatorFn
 * @returns {import('express').RequestHandler}
 */
export function validateRequest(validatorFn) {
  return (req, res, next) => {
    const errors = validatorFn(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please correct the specified fields.',
        errors,
      });
    }
    next();
  };
}

export default validateRequest;
