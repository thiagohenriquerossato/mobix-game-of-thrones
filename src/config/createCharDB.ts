/* eslint-disable no-plusplus */

/* eslint-disable no-await-in-loop */

import axios from "axios";

import prismaClient from "../prisma";

const api = axios.create({
    baseURL: "https://anapioficeandfire.com/api",
});

const apiChar = axios.create({
    baseURL: "",
});

interface IDataResponse {
    url: string;

    name: string;

    povCharacters: string[];
}

interface IChar {
    name: string;

    gender: string;

    culture: string;

    born: string;

    died: string;

    titles: string[];

    aliases: string[];

    father: any;

    mother: any;

    spouse: any;

    allegiances: any;

    books: string[];

    tv_series: string[];

    played_by: string[];
}

interface ICharResponse {
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

const charactersList: IChar[] = [];

const povCharacterList: string[] = [];

const books: IDataResponse[] = [];

async function getAllPovCharacters(): Promise<void> {
    async function getAllegiances(allegiances: string[]): Promise<string[]> {
        const result = [];

        for (let i = 0; i < allegiances.length; i++) {
            try {
                const { data } = await apiChar.get(allegiances[i]);

                result.push(data.name);
            } catch (error) {
                return [];
            }
        }

        return result;
    }

    async function getFamilyName(link: string): Promise<string> {
        try {
            const { data } = await apiChar.get<IChar>(link);

            const result = data.name;

            return result;
        } catch (err) {
            return "";
        }
    }

    const { data } = await api.get<IDataResponse[]>("/books");

    data.forEach((book) => {
        books.push({
            name: book.name,

            povCharacters: book.povCharacters,

            url: book.url,
        });

        book.povCharacters.forEach((char) => {
            if (!povCharacterList.includes(char)) {
                povCharacterList.push(char);
            }
        });
    });

    for (let i = 0; i < povCharacterList.length; i++) {
        try {
            const { data: character } = await apiChar.get<ICharResponse>(
                povCharacterList[i]
            );

            const povBooks = [];

            for (let i = 0; i < character.povBooks.length; i++) {
                for (let j = 0; j < books.length; j++) {
                    const [, compare1] = character.povBooks[i].split("/books");

                    const [, compare2] = books[j].url.split("/books");

                    if (compare1 === compare2) {
                        povBooks.push(books[j].name);

                        break;
                    }
                }
            }

            charactersList.push({
                name: character.name,

                gender: character.gender,

                culture: character.culture,

                born: character.born,

                died: character.died,

                titles: character.titles,

                aliases: character.aliases,

                father: await getFamilyName(character.father),

                mother: await getFamilyName(character.mother),

                spouse: await getFamilyName(character.spouse),

                allegiances: await getAllegiances(character.allegiances),

                books: povBooks,

                tv_series: character.tvSeries,

                played_by: character.playedBy,
            });
        } catch (err) {
            console.log(err);
        }
    }

    console.log(books.length);

    console.log(povCharacterList.length);

    console.log(charactersList.length);

    await prismaClient.character.createMany({
        data: charactersList,
    });
}

getAllPovCharacters();
