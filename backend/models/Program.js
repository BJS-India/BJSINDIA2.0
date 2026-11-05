import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    basketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Basket',
      required: [true, 'Basket ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Program name is required'],
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    thumbnail: {
      url: {
        type: String,
        default: '',
        trim: true,
      },
      key: {
        type: String,
        default: '',
        trim: true,
      },
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Slug auto-generation fallback
programSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Virtual populate for content associated with this program
programSchema.virtual('content', {
  ref: 'ProgramContent',
  localField: '_id',
  foreignField: 'programId',
  justOne: true,
  match: { isDeleted: false },
});

const Program = mongoose.model('Program', programSchema, 'programs');

export default Program;

