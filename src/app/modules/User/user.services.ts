
import bcrypt from 'bcrypt';
import ApiError from '../../../errors/ApiErrors';
import prisma from "../../../shared/prisma";



const createUserIntoDb = async (payload: any) => {
    // Validate required fields
    if (!payload.email || !payload.password) {
        throw new ApiError(400, "Email and password are required");
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Using prisma transaction for atomic operations
    const result = await prisma.$transaction(async (transactionClient:any) => {
        // Check if user already exists
        const isUserExist = await transactionClient.user.findUnique({
            where: { email: payload.email },
        });

        if (isUserExist) {
            throw new ApiError(400, "User already exists with this email address");
        }

        // Create the user
        const user = await transactionClient.user.create({
            data: {
                ...payload,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,                
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    });

    return result;
};

export const UserServices = {
    createUserIntoDb,
};