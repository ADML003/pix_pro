"use server";

import { revalidatePath } from "next/cache";
import { clerkClient } from "@clerk/nextjs";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      // If user doesn't exist in database, create a basic user record
      console.log("User not found in database, creating basic user record");

      const clerkUser = await clerkClient.users.getUser(userId);

      const newUser = {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username:
          clerkUser.username ||
          clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        photo: clerkUser.imageUrl || "",
      };

      const createdUser = await createUser(newUser);
      return JSON.parse(JSON.stringify(createdUser));
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    console.log(
      "Updating credits for user:",
      userId,
      "with amount:",
      creditFee
    );

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updatedUserCredits) {
      console.log("User not found with ID:", userId);
      throw new Error("User credits update failed");
    }

    console.log(
      "Credits updated successfully. New balance:",
      updatedUserCredits.creditBalance
    );
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    console.error("Error in updateCredits:", error);
    handleError(error);
  }
}
