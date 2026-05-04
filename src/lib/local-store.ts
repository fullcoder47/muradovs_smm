import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ResourceKey } from "@/lib/admin-config";

type StoreRecord = Record<string, unknown> & { id: string; createdAt: string | Date; updatedAt: string | Date };
type Store = Partial<Record<ResourceKey | "leads", StoreRecord[]>>;

const storePath = path.join(process.cwd(), ".data", "admin-store.json");

async function readStore(): Promise<Store> {
  try {
    return JSON.parse(await readFile(storePath, "utf8")) as Store;
  } catch {
    return {};
  }
}

async function writeStore(store: Store) {
  await mkdir(path.dirname(storePath), { recursive: true });
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function listLocalRecords<T extends Record<string, unknown> = StoreRecord>(resource: ResourceKey | "leads"): Promise<T[]> {
  const store = await readStore();
  return (store[resource] ?? []) as T[];
}

export async function findLocalRecord(resource: ResourceKey, id: string) {
  const records = await listLocalRecords(resource);
  return records.find((record) => record.id === id) ?? null;
}

export async function saveLocalRecord(resource: ResourceKey, id: string | undefined, data: Record<string, unknown>) {
  const store = await readStore();
  const records = store[resource] ?? [];
  const now = new Date().toISOString();

  if (id) {
    store[resource] = records.map((record) =>
      record.id === id ? { ...record, ...data, id, updatedAt: now } : record,
    );
  } else {
    store[resource] = [
      {
        ...data,
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: now,
        updatedAt: now,
      },
      ...records,
    ];
  }

  await writeStore(store);
}

export async function deleteLocalRecord(resource: ResourceKey, id: string) {
  const store = await readStore();
  store[resource] = (store[resource] ?? []).filter((record) => record.id !== id);
  await writeStore(store);
}

export async function saveLocalLead(data: Record<string, unknown>) {
  const store = await readStore();
  const now = new Date().toISOString();
  store.leads = [
    {
      ...data,
      id: `local-lead-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      status: "NEW",
      createdAt: now,
      updatedAt: now,
    },
    ...(store.leads ?? []),
  ];
  await writeStore(store);
}
