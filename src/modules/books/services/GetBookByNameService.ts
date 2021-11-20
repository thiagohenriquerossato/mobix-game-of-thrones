import prismaClient from "../../../prisma";

interface ICoverBook {
    id: string;
    name: string;
    cover_image: string;
}

class GetBookByNameService {
    async execute(name: string): Promise<ICoverBook[]> {
        const book = await prismaClient.book.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
            select: {
                id: true,
                name: true,
                cover_image: true,
            },
        });

        return book;
    }
}

export { GetBookByNameService };
