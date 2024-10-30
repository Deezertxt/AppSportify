-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(10) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(15) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audiobook" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT,
    "author" VARCHAR(100) NOT NULL,
    "duration" VARCHAR(10) NOT NULL,
    "pdfUrl" TEXT,
    "coverUrl" TEXT,
    "audioUrl" TEXT,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audiobook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "audiobookId" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "played" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_title_key" ON "Audiobook"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_pdfUrl_key" ON "Audiobook"("pdfUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_coverUrl_key" ON "Audiobook"("coverUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_audioUrl_key" ON "Audiobook"("audioUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Audiobook_text_key" ON "Audiobook"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Audiobook" ADD CONSTRAINT "Audiobook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
