/*
 * LEVEL 05 photo dropzone.
 *
 * Keep exactly these two files named memory-01.jpg and memory-02.jpg.
 * For local preview, place them in the project root's public path or replace
 * these src values with the uploaded storage URLs before publishing.
 * No photo content or captions are fabricated by this archive.
 */
export const MEMORY_ASSETS = [
  {
    id: "memory-01",
    label: "MEMORY 01",
    fileName: "memory-01.jpg",
    src: "/manus-storage/memory-01_3884473c.jpg",
  },
  {
    id: "memory-02",
    label: "MEMORY 02",
    fileName: "memory-02.jpg",
    src: "/manus-storage/memory-02_a4ba5bda.jpg",
  },
] as const;

export type MemoryId = (typeof MEMORY_ASSETS)[number]["id"];
