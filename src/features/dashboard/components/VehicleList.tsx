import { FleetVehicle } from '../types';
import { VEHICLE_LIST_MAX_HEIGHT } from '../utlies';
import { VehicleListItem } from './LiveFleetTracking';

export function VehicleList({ vehicles }: { vehicles: FleetVehicle[] }) {
    if (vehicles.length === 0) {
        return (
            <div className="px-6 pb-6">
                <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No vehicles available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pb-6">
            <div
                className="space-y-2 overflow-y-auto"
                style={{ maxHeight: `${VEHICLE_LIST_MAX_HEIGHT}px` }}
            >
                {vehicles.map((vehicle) => (
                    <VehicleListItem key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
}
