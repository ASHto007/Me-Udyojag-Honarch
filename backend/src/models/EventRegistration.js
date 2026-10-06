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
      trim: true,
      maxlength: [150, 'Business name cannot exceed 150 characters'],
      default: '',
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
      enum: ['confirmed', 'waitlisted', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique indexes to prevent duplicate registrations for the same event
eventRegistrationSchema.index(
  { eventId: 1, email: 1 },
  { unique: true, name: 'uniq_event_email' }
);
eventRegistrationSchema.index(
  { eventId: 1, phone: 1 },
  { unique: true, name: 'uniq_event_phone' }
);
eventRegistrationSchema.index({ eventId: 1, createdAt: -1 });

export const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);
export default EventRegistration;
