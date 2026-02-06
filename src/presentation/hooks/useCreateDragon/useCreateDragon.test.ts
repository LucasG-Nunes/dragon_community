import { act } from "react";
import { QueryClient } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Dragon } from "../../../core/entities/Dragon";
import { CreateDragonUseCase } from "../../../core/useCases/dragons/CreateDragonUsecase";
import { createWrapper } from "../../../shared/helpers/query-client-provider-helper";
import { useCreateDragon } from "./useCreateDragon";

vi.mock("../../../infrastructure/instance", () => ({
  dragonService: {
    create: vi.fn(),
    findAll: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../../core/useCases/dragons/CreateDragonUsecase", () => ({
  CreateDragonUseCase: vi.fn(),
}));

describe("useCreateDragon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve criar dragão com sucesso", async () => {
    const mockDragon: Dragon = {
      id: "1",
      name: "Bahamut",
      type: "Luz",
      createdAt: new Date(),
    };

    const executeMock = vi.fn().mockResolvedValue(mockDragon);

    (CreateDragonUseCase as unknown as vi.Mock).mockImplementation(function () {
      return { execute: executeMock };
    });

    const { result } = renderHook(() => useCreateDragon(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ name: "Bahamut", type: "Luz" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(executeMock).toHaveBeenCalledWith({ name: "Bahamut", type: "Luz" });
    expect(result.current.data).toEqual(mockDragon);
  });

  it("deve lidar com erro na criação do dragão", async () => {
    const error = new Error("Falha ao invocar dragão");
    const executeMock = vi.fn().mockRejectedValue(error);

    (CreateDragonUseCase as unknown as vi.Mock).mockImplementation(function () {
      return { execute: executeMock };
    });

    const { result } = renderHook(() => useCreateDragon(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ name: "Erro" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(executeMock).toHaveBeenCalled();
    expect(result.current.error).toEqual(error);
  });

  it("deve invalidar queries ao criar dragão com sucesso", async () => {
    const mockDragon: Dragon = {
      id: "2",
      name: "Smaug",
      type: "Fogo",
      createdAt: new Date(),
    };

    const executeMock = vi.fn().mockResolvedValue(mockDragon);

    (CreateDragonUseCase as unknown as vi.Mock).mockImplementation(function () {
      return { execute: executeMock };
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateDragon(), {
      wrapper: createWrapper(queryClient),
    });

    act(() => {
      result.current.mutate({ name: "Smaug", type: "Fogo" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["dragons"],
    });
  });

  it("deve criar dragão com campos parciais", async () => {
    const mockDragon: Dragon = {
      id: "4",
      name: "Alduin",
      type: "Desconhecido",
      createdAt: new Date(),
    };

    const executeMock = vi.fn().mockResolvedValue(mockDragon);

    (CreateDragonUseCase as unknown as vi.Mock).mockImplementation(function () {
      return { execute: executeMock };
    });

    const { result } = renderHook(() => useCreateDragon(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ name: "Alduin" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(executeMock).toHaveBeenCalledWith({ name: "Alduin" });
  });

  it("deve incrementar failureCount quando falha", async () => {
    const executeMock = vi.fn().mockRejectedValue(new Error("Falha"));

    (CreateDragonUseCase as unknown as vi.Mock).mockImplementation(function () {
      return { execute: executeMock };
    });

    const { result } = renderHook(() => useCreateDragon(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ name: "Fail" });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.failureCount).toBeGreaterThan(0);
  });
});
