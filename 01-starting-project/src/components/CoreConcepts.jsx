import { CORE_CONCEPTS } from "../data";
import CoreConcenpt from "./CoreConcept";

export default function CoreConcenpts() {
    return (
        <section id='core-concepts'>
            <h2>Core Concepts</h2>
            <ul>
                {CORE_CONCEPTS.map((conceptItem) => (<CoreConcenpt key={conceptItem.title} {...conceptItem} />))}
            </ul>
        </section>
    );
}