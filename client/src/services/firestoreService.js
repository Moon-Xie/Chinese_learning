import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';

// Get user's learning progress
export async function getUserProgress(userId) {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data().learningProgress;
    }
    return null;
  } catch (error) {
    console.error('Error getting user progress:', error);
    throw error;
  }
}

// Update user's current level
export async function updateUserLevel(userId, newLevel) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      'learningProgress.currentLevel': newLevel
    });
  } catch (error) {
    console.error('Error updating user level:', error);
    throw error;
  }
}

// Mark a lesson as completed
export async function completeLesson(userId, lessonId) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      'learningProgress.completedLessons': arrayUnion(lessonId)
    });
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
}

// Add vocabulary to mastered list
export async function masterVocabulary(userId, vocabularyId) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      'learningProgress.vocabularyMastered': arrayUnion(vocabularyId)
    });
  } catch (error) {
    console.error('Error mastering vocabulary:', error);
    throw error;
  }
}

// Remove vocabulary from mastered list (if needed for review)
export async function unmasterVocabulary(userId, vocabularyId) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      'learningProgress.vocabularyMastered': arrayRemove(vocabularyId)
    });
  } catch (error) {
    console.error('Error unmastering vocabulary:', error);
    throw error;
  }
}

// Get all users (for admin purposes)
export async function getAllUsers() {
  try {
    const usersQuery = query(collection(db, 'users'));
    const querySnapshot = await getDocs(usersQuery);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
}

// Get users by level
export async function getUsersByLevel(level) {
  try {
    const usersQuery = query(
      collection(db, 'users'),
      where('learningProgress.currentLevel', '==', level)
    );
    const querySnapshot = await getDocs(usersQuery);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error getting users by level:', error);
    throw error;
  }
} 