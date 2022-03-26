import { Types } from 'mongoose';

// validate mongoose object id
const isValidObjectId = (val: string): string => {
  const _error = new Error('Invalid Mongo Id');
  if (Types.ObjectId.isValid(val)) {
    if (String(new Types.ObjectId(val)) === val) return val;
    throw _error;
  }
  throw _error;
};

export { isValidObjectId };
