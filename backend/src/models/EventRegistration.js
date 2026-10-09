import mongoose from 'mongoose';

const eventRegistrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      trim: true,
    },
    eventTitle: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Event title cannot exceed 200 characters'],
    },
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
    businessName: {
      type: String,
      required: [true, 'Business or organization name is required'],
      trim: true,
      minlength: [2, 'Business name must be at least 2 characters'],
      maxlength: [150, 'Business name cannot exceed 150 characters'],
    },
    netWorth: {
      type: String,
      required: [true, 'Business turnover or net worth is required'],
      trim: true,
      maxlength: [100, 'Net worth cannot exceed 100 characters'],
    },
    cityDistrict: {
      type: String,
      required: [true, 'City or district is required'],
      trim: true,
      minlength: [2, 'City or district must be at least 2 characters'],
      maxlength: [100, 'City or district cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Please share details about your business and why you want to join'],
      trim: true,
      minlength: [10, 'Please write at least 10 characters about your business and goals'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
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
      enum: ['pending', 'confirmed', 'waitlisted', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Index for listing registrations sorted by newest first
eventRegistrationSchema.index({ eventId: 1, createdAt: -1 });

export const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
export default EventRegistration;
