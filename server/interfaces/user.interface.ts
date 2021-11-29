import UserRole from './userRole.interface';

interface User {
    id: number,
    firtName: string;
    lastName: string;
    email: string;
    password: string;
    resetPasswordLink: string;
    resetPasswordLinkExpirationTimestamp: number;
    pictureName: string;
    averageAnswerTimeInSeconds: number;
    userRoleCode: string | UserRole;
}

export default User;
