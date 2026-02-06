import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "../../http/api";
import { DragonService } from "./DragonService";

vi.mock("../../http/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("DragonService", () => {
  let dragonService: DragonService;

  beforeEach(() => {
    dragonService = new DragonService();
    vi.clearAllMocks();
  });

  describe("fetchAll", () => {
    it("deve retornar uma lista de dragões ordenada por nome", async () => {
      const mockDragons = [
        { id: "1", name: "Zeryth", type: "Fogo", createdAt: "2024-01-01" },
        { id: "2", name: "Abraxas", type: "Gelo", createdAt: "2024-01-02" },
      ];

      vi.mocked(api.get).mockResolvedValue({ data: mockDragons });

      const result = await dragonService.fetchAll();

      expect(api.get).toHaveBeenCalledWith("/dragon");

      expect(result[0].name).toBe("Abraxas");
      expect(result[1].name).toBe("Zeryth");

      expect(result[0].createdAt).toBeInstanceOf(Date);
    });
  });

  describe("fetchById", () => {
    it("deve retornar um dragão específico mapeado para o domínio", async () => {
      const mockDragon = {
        id: "123",
        name: "Bahamut",
        type: "Luz",
        createdAt: "2024-01-01",
      };
      vi.mocked(api.get).mockResolvedValue({ data: mockDragon });

      const result = await dragonService.fetchById("123");

      expect(api.get).toHaveBeenCalledWith("/dragon/123");
      expect(result.name).toBe("Bahamut");
      expect(result.id).toBe("123");
    });
  });

  describe("create", () => {
    it("deve enviar os dados corretos para criar um dragão", async () => {
      const newDragon = { name: "Spyro", type: "Fogo" };
      vi.mocked(api.post).mockResolvedValue({});

      await dragonService.create(newDragon);

      expect(api.post).toHaveBeenCalledWith("/dragon", newDragon);
    });
  });

  describe("update", () => {
    it("deve chamar o endpoint de update com o ID e corpo corretos", async () => {
      const updatedData = { name: "Spyro Rei" };
      vi.mocked(api.put).mockResolvedValue({});

      await dragonService.update("123", updatedData);

      expect(api.put).toHaveBeenCalledWith("/dragon/123", updatedData);
    });
  });

  describe("delete", () => {
    it("deve chamar o endpoint de delete com o ID correto", async () => {
      vi.mocked(api.delete).mockResolvedValue({});

      await dragonService.delete("123");

      expect(api.delete).toHaveBeenCalledWith("/dragon/123");
    });
  });
});
