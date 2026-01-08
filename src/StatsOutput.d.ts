import { Component } from "react";
declare class StatsOutput extends Component {
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    storeTrackObjects(tracks: any): void;
    storeTrackFeatures(features: any): void;
    storeStats(): void;
    storeGenres(): void;
    getModeString(): string;
    getTimeSigString(): string;
    getKeyString(): string;
    getGenreString(): string;
    getCustomTitle(): string;
    render(): JSX.Element;
}
export default StatsOutput;
//# sourceMappingURL=StatsOutput.d.ts.map