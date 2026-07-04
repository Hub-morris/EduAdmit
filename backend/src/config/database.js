import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient({
    adapter: undefined,
});
export default prisma;
