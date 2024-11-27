-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" VARCHAR(100),
    "language" TEXT NOT NULL DEFAULT 'Español',
    "gender" TEXT DEFAULT 'Otro',
    "bio" VARCHAR(180),
    "profilePicUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audiobook" (
    "id" SERIAL NOT NULL,
    "title" CHAR(35) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT,
    "author" CHAR(35) NOT NULL,
    "duration" VARCHAR(10) NOT NULL,
    "pdfUrl" TEXT,
    "coverUrl" TEXT,
    "audioUrl" TEXT,
    "text" TEXT,
    "averageRating" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audiobook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "audiobookId" INTEGER NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "audiobookId" INTEGER NOT NULL,
    "saved" BOOLEAN NOT NULL DEFAULT false,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "played" BOOLEAN NOT NULL DEFAULT false,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "recommended" BOOLEAN NOT NULL DEFAULT false,

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
CREATE UNIQUE INDEX "Feedback_userId_key" ON "Feedback"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_audiobookId_key" ON "Feedback"("audiobookId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Audiobook" ADD CONSTRAINT "Audiobook_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_audiobookId_fkey" FOREIGN KEY ("audiobookId") REFERENCES "Audiobook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
