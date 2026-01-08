import { Component } from "react";
import "./App.css";
export declare const authEndpoint = "https://accounts.spotify.com/authorize";
export declare const PAGE_SIZE = 50;
declare class App extends Component {
    constructor();
    setPlaylists(data: any, previous: any, next: any): void;
    componentDidMount(): void;
    onNext(): void;
    onPrevious(): void;
    render(): JSX.Element;
}
export default App;
//# sourceMappingURL=App.d.ts.map