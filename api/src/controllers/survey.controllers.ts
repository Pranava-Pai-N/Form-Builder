import { connectDB } from "../lib/database";



const getUserSurveys = async (content: any) => {
    try {
        const user = content.get("user");

        const id = user.id;

        const prisma = connectDB(content.env.HYPERDRIVE);

        const userSurveys = await prisma.user.findUnique({
            where: { id },
            include: {
                createdSurveys: true
            }
        });

        if (!userSurveys || userSurveys.createdSurveys.length === 0) {
            return content.json(
                {
                    success: true,
                    message: "Please create a survey first.",
                },
                200
            );
        }

        return content.json(
            {
                success: true,
                message: "All surveys created by user retrieved successfully",
                surveys: userSurveys.createdSurveys
            },
            200
        );
    } catch (error) {
        return content.json(
            {
                success: false,
                message: "Error fetching surveys"
            },
            500
        );
    }
}


const surveyControllers = {
    getUserSurveys
}


export default surveyControllers;