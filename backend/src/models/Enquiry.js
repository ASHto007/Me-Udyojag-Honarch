import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      maxlength: [254, 'Email cannot exceed 254 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City or district is required'],
      trim: true,
      minlength: [2, 'City must be at least 2 characters'],
      maxlength: [100, 'City cannot exceed 100 characters'],
    },
    stage: {
      type: String,
      trim: true,
      default: 'Aspiring Entrepreneur (Idea Stage)',
    },
    interest: {
      type: String,
      trim: true,
      default: 'Mentorship & Guidance (Service 03)',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
      default: '',
    },
    consent: {
      type: Boolean,
      required: [true, 'Consent is required'],
      validate: {
        validator: (v) => v === true,
        message: 'Consent must be granted',
      },
    },
    ip: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'resolved', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for administrative querying and search
enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ email: 1 });
enquirySchema.index({ phone: 1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
