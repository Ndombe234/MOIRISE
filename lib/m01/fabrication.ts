import type { CapabilityDefinition } from "@/lib/m01/contracts";

export type FabricationStatus =
  | "PLANNED"
  | "IMPLEMENTED"
  | "PARTIAL"
  | "BLOCKED"
  | "INCONCLUSIVE"
  | "VERIFIED";

export type FabricationTask = {
  id: string;
  featureId: string;
  ownerModule: "M01";
  dependencies: readonly string[];
  files: readonly string[];
  symbols: readonly string[];
  status: FabricationStatus;
};

const TASKS: readonly FabricationTask[] = [
  {
    id: "M01-T01",
    featureId: "M01-F01",
    ownerModule: "M01",
    dependencies: [],
    files: ["lib/m01/contracts.ts"],
    symbols: ["AuthClass", "RequestContext", "SessionContext", "CapabilityStatus", "CapabilityDefinition"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T02",
    featureId: "M01-F02",
    ownerModule: "M01",
    dependencies: ["M01-T01"],
    files: ["lib/m01/errors.ts"],
    symbols: ["AppErrorCode", "AppError", "createAppError"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T03",
    featureId: "M01-F03",
    ownerModule: "M01",
    dependencies: ["M01-T01"],
    files: ["lib/m01/capabilities.ts"],
    symbols: ["listCapabilities", "resolveCapability"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T04",
    featureId: "M01-F04",
    ownerModule: "M01",
    dependencies: ["M01-T01"],
    files: ["lib/m01/public-config.ts"],
    symbols: ["getPublicSupabaseConfig"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T05",
    featureId: "M01-F05",
    ownerModule: "M01",
    dependencies: ["M01-T04"],
    files: ["lib/supabase/server.ts", "lib/supabase/client.ts"],
    symbols: ["createSupabaseServerClient", "createSupabaseBrowserClient"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T06",
    featureId: "M01-F06",
    ownerModule: "M01",
    dependencies: ["M01-T05"],
    files: ["lib/m01/session.ts"],
    symbols: ["resolveSessionContext"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T07",
    featureId: "M01-F07",
    ownerModule: "M01",
    dependencies: ["M01-T06"],
    files: ["app/layout.tsx", "app/page.tsx", "app/loading.tsx", "app/error.tsx"],
    symbols: ["RootLayout", "HomePage", "Loading", "GlobalError"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T08",
    featureId: "M01-F08",
    ownerModule: "M01",
    dependencies: ["M01-T06", "M01-T07"],
    files: ["app/api/health/route.ts", "app/api/session/route.ts"],
    symbols: ["GET"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T09",
    featureId: "M01-F09",
    ownerModule: "M01",
    dependencies: ["M01-T05", "M01-T07"],
    files: [
      "app/auth/sign-in/page.tsx",
      "app/auth/sign-up/page.tsx",
      "app/auth/callback/route.ts",
      "proxy.ts",
    ],
    symbols: ["SignInPage", "SignUpPage", "GET", "proxy"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T10",
    featureId: "M01-F10",
    ownerModule: "M01",
    dependencies: ["M01-T01", "M01-T02", "M01-T03"],
    files: ["tests/m01-contracts.test.ts"],
    symbols: ["M01 capability boundary", "M01 application error contract"],
    status: "IMPLEMENTED",
  },
  {
    id: "M01-T11",
    featureId: "M01-F09",
    ownerModule: "M01",
    dependencies: ["M01-T08", "M01-T09", "M01-T10"],
    files: [],
    symbols: ["desktop browser verification"],
    status: "PLANNED",
  },
  {
    id: "M01-T12",
    featureId: "M01-F09",
    ownerModule: "M01",
    dependencies: ["M01-T11"],
    files: [],
    symbols: ["mobile browser verification"],
    status: "PLANNED",
  },
  {
    id: "M01-T13",
    featureId: "M01-F10",
    ownerModule: "M01",
    dependencies: ["M01-T08", "M01-T09", "M01-T10"],
    files: [],
    symbols: ["security", "resilience", "replay", "concurrency"],
    status: "PLANNED",
  },
  {
    id: "M01-T14",
    featureId: "M01-F10",
    ownerModule: "M01",
    dependencies: ["M01-T10", "M01-T12", "M01-T13"],
    files: [],
    symbols: ["typecheck", "test", "production build", "evidence"],
    status: "PLANNED",
  },
] as const;

function hasTask(taskId: string): boolean {
  return TASKS.some((task) => task.id === taskId);
}

export function listFabricationTasks(): readonly FabricationTask[] {
  return TASKS;
}

export function getFabricationTask(taskId: string): FabricationTask | null {
  return TASKS.find((task) => task.id === taskId) ?? null;
}

export function validateFabricationGraph(tasks: readonly FabricationTask[] = TASKS): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const task of tasks) {
    if (ids.has(task.id)) {
      errors.push(`duplicate task id: ${task.id}`);
    }
    ids.add(task.id);

    if (task.ownerModule !== "M01") {
      errors.push(`invalid owner for ${task.id}: ${task.ownerModule}`);
    }

    for (const dependency of task.dependencies) {
      if (dependency === task.id) {
        errors.push(`self dependency: ${task.id}`);
      } else if (!tasks.some((candidate) => candidate.id === dependency)) {
        errors.push(`missing dependency: ${task.id} -> ${dependency}`);
      }
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(taskId: string, path: string[]): void {
    if (visiting.has(taskId)) {
      errors.push(`dependency cycle: ${[...path, taskId].join(" -> ")}`);
      return;
    }
    if (visited.has(taskId)) return;

    const task = tasks.find((candidate) => candidate.id === taskId);
    if (!task) return;

    visiting.add(taskId);
    for (const dependency of task.dependencies) {
      visit(dependency, [...path, taskId]);
    }
    visiting.delete(taskId);
    visited.add(taskId);
  }

  for (const task of tasks) {
    visit(task.id, []);
  }

  return [...new Set(errors)];
}

export function getReadyFabricationTasks(tasks: readonly FabricationTask[] = TASKS): readonly FabricationTask[] {
  const errors = validateFabricationGraph(tasks);
  if (errors.length > 0) {
    return [];
  }

  return tasks.filter((task) => {
    if (task.status !== "PLANNED") return false;
    return task.dependencies.every((dependencyId) => {
      const dependency = tasks.find((candidate) => candidate.id === dependencyId);
      return dependency?.status === "IMPLEMENTED" || dependency?.status === "VERIFIED";
    });
  });
}

export function fabricationTaskOwnsOnlyM01(task: FabricationTask): boolean {
  return task.ownerModule === "M01" && task.files.every((file) => file.length > 0);
}

export function capabilityTaskReferencesKnownDefinition(
  capabilityId: string,
): CapabilityDefinition | null {
  const task = getFabricationTask("M01-T03");
  if (!task || !fabricationTaskOwnsOnlyM01(task)) return null;

  const definitions = [
    "m01.boot",
    "m01.route",
    "m01.session",
    "m01.capability-registry",
    "m01.ai-gateway",
    "m01.event-bus",
  ];

  return definitions.includes(capabilityId)
    ? {
        id: capabilityId,
        version: 1,
        ownerModule: "M01",
        status: "declared",
        description: "Fabrication-reference capability.",
      }
    : null;
}

export function fabricationGraphIsCanonical(): boolean {
  return validateFabricationGraph().length === 0 && TASKS.every((task) => hasTask(task.id));
}
