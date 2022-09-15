const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
    {
      reactionId: {
     type: Schema.Types.ObjectId,
     default: () => new Types.ObjectId(),
      required: true,
    },
    reactionBody:{
        type: String,
      required: true,

    },
    username:{
        type: String,
      required: true,

    },
    createdAt:{
      type: Date,
      default: Date.now(),

    }
    
    });


module.exports = reactionSchema;