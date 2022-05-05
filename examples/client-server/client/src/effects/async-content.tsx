import { useState, useEffect, ComponentType, PropsWithChildren, ReactElement } from "react";
import React from "react";

function getDisplayName(WrappedComponent: ComponentType): string {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

function setDisplayName(WrappedComponent: ComponentType, name: string): void {
    WrappedComponent.displayName = name;
}

interface IAsyncCallState<T> {
    loading?: boolean;
    error?: Error;
    content?: T;
}

type PromiseFunction<T = any> = (...args: any[]) => Promise<T>;

export function useAsyncCall<T = any>(promiseFn: PromiseFunction<T>) {
    const [{ loading, error, content }, setState] = useState({} as IAsyncCallState<T>);

    useEffect(() => {
        setState({ loading: true });
        promiseFn().then(
            x => setState({ content: x, loading: false }),
            e => setState({ error: e, loading: false })
        );
    }, [promiseFn]);

    return { loading, error, content };
}

interface IAsyncContentWrapperProps {
    loadingComponent?: ReactElement;
    errorComponent?: ReactElement;
    noContentComponent?: ReactElement;
}

export interface IAsyncContentProps<T> {
    content?: T;
}

export type AsyncComponentType = ComponentType<IAsyncContentWrapperProps>;

export function withAsyncContent<T = any>(
    WrappedComponent: ComponentType<IAsyncContentProps<T>>,
    promiseFn: PromiseFunction<T>
): AsyncComponentType {
    const WithAsyncContent = (props: PropsWithChildren<IAsyncContentWrapperProps>): ReactElement => {
        const { loading, error, content } = useAsyncCall(promiseFn);
        const loadingComponent = (loading && (props.loadingComponent || <div>Loading...</div>)) as ReactElement;
        const errorComponent = error && (props.errorComponent || <div style={{ color: "red" }}>{error.message}</div>);
        const noContentComponent = !content && (props.noContentComponent || <div>There's no content</div>);
        const contentComponent = <WrappedComponent content={content} {...props} />;

        return loadingComponent || errorComponent || noContentComponent || contentComponent;
    };

    setDisplayName(WithAsyncContent, `WithAsyncContent(${getDisplayName(WrappedComponent)})`);
    return WithAsyncContent;
}
