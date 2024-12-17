import type { $Enums } from "@prisma/client";

export type BikeWithGeoInfo = {
    distance: number;
    streetName: string | null;
    status: $Enums.Status;
    id: string;
    longitude: number;
    latitude: number;
}