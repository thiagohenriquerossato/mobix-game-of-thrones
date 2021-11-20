/* eslint-disable no-plusplus */

/* eslint-disable no-await-in-loop */

import axios from "axios";
import imageToBase64 from "image-to-base64";

import prismaClient from "../prisma";

const api = axios.create({
    baseURL: "https://anapioficeandfire.com/api",
});

const apiChar = axios.create({
    baseURL: "",
});

interface IDataResponse {
    name: string;

    isbn: string;

    authors: string[];

    numberOfPages: number;

    publisher: string;

    country: string;

    mediaType: string;

    released: string;

    povCharacters: string[];
}

interface IBook {
    name: string;

    isbn: string;

    authors: string[];

    number_of_pages: number;

    publisher: string;

    country: string;

    media_type: string;

    released: Date;

    pov_characters: string[];

    cover_image: string;
}

interface IChar {
    name: string;

    gender: string;

    culture: string;

    born: string;

    died: string;

    titles: string[];

    aliases: string[];

    father: string;

    mother: string;

    spouse: string;

    allegiances: string[];

    povBooks: string[];

    tvSeries: string[];

    playedBy: string[];
}

const booksList: IBook[] = [];

const povCharacterList: string[] = [];

async function getAllData(): Promise<void> {
    const { data: books } = await api.get<IDataResponse[]>("/books");

    async function getCharName(links: string[]): Promise<string[]> {
        const names = [];

        try {
            for (let i = 0; i < links.length; i++) {
                const { data } = await apiChar.get<IChar>(links[i]);

                names.push(data.name);
            }

            return names;
        } catch (err) {
            return [];
        }
    }

    for (let i = 0; i < books.length; i++) {
        povCharacterList.splice(0, povCharacterList.length);

        const cover_image = await imageToBase64(
            `http://covers.openlibrary.org/b/isbn/${books[i].isbn}-M.jpg`
        )
            .then((response) => {
                return response;
            })

            .catch((error) => {
                throw new Error(error);
            });

        booksList.push({
            name: books[i].name,

            isbn: books[i].isbn,

            authors: books[i].authors,

            number_of_pages: books[i].numberOfPages,

            publisher: books[i].publisher,

            country: books[i].country,

            media_type: books[i].mediaType,

            released: new Date(books[i].released),

            pov_characters: await getCharName(books[i].povCharacters),

            cover_image,
        });
    }

    await prismaClient.book.createMany({
        data: booksList,
    });
}

getAllData();
