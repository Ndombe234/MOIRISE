export type AppErrorCode =
  | "VALIDATION"
  | "AUTH_REQUIRED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "TIMEOUT"
  | "DEPENDENCY_UNAVAILABLE"
  | "INCONCLUSIVE"
  | "INTERNAL";

export interface AppError {
  code: AppErrorCode;
  requestId: string;
  retryable: boolean;
  userMessageKey: string;
  technicalRef?: string;
}

export function createAppError(
  code: AppErrorCode,
  requestId: string,
  userMessageKey: string,
  options?: Pick<AppError, "retryable" | "technicalRef">,
): AppError {
  return {
    code,
    requestId,
    retryable: options?.retryable ?? false,
    userMessageKey,
    ...(options?.technicalRef ? { technicalRef: options.technicalRef } : {}),
  };
}
