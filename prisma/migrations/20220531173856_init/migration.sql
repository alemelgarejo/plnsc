-- CreateTable
CREATE TABLE "BookSugesstion" (
    "id" SERIAL NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "bookAuthor" TEXT NOT NULL,
    "bookGenre" TEXT NOT NULL,

    CONSTRAINT "BookSugesstion_pkey" PRIMARY KEY ("id")
);
