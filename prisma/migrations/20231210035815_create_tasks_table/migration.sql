-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "startTime" SMALLINT NOT NULL,
    "endTime" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
