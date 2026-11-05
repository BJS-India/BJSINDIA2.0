import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    topics: {
      type: [String],
      default: [],
    },
  },
  { _id: true }
);

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    type: {
      type: String,
      enum: ['document', 'video', 'link', 'image'],
      default: 'document',
    },
    url: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { _id: true }
);

const programContentSchema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: [true, 'Program ID is required'],
      unique: true,
      index: true,
    },
    overview: {
      type: String,
      default: '',
      trim: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: [String],
      default: [],
    },
    duration: {
      type: String,
      default: '',
      trim: true,
    },
    modules: {
      type: [moduleSchema],
      default: [],
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
    additionalInformation: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
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
  }
);

const ProgramContent = mongoose.model('ProgramContent', programContentSchema, 'programContents');

export default ProgramContent;

