import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index:true
    },
    password: {
        type: String, 
        required: true
    }
},{
    timestamps: true
});

UserSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error)
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch (error) {
        throw new Error('password not matched');
    }
};

export default mongoose.model('User', UserSchema);