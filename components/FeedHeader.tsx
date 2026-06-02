interface FeedHeaderProps {
    activeWhat: string;
    activeWhere: string;
    onClear: () => void;
}

export default function FeedHeader({ activeWhat, activeWhere, onClear }: FeedHeaderProps) {
    const hasWhatFilter = typeof activeWhat === "string" && activeWhat.trim().length > 0;
    const hasWhereFilter = typeof activeWhere === "string" && activeWhere.trim().length > 0;
    const isFiltering = hasWhatFilter || hasWhereFilter;
    return (
        <div className="mb-6  border-b border-gray-100 pb-4">
            <div className="flex  gap-4  items-center justify-between">
                <div className="min-w-0">
                    {!isFiltering ? (
                        <h2 className="text-xl font-bold text-gray-900"> Explore Latest Job Openings</h2>
                    ) : (
                        <div className="text-sm text-gray-500 font-medium">
                            Showing results for:{" "}
                            {hasWhatFilter && <span className="font-semibold text-base text-gray-900">{activeWhat}</span>}
                            {hasWhereFilter && <span className="mx-1 text-base text-gray-900">in</span>}
                            {hasWhereFilter && <span className="font-semibold text-base text-gray-900">{activeWhere}</span>}
                        </div>
                    )}
                </div>
            </div>
            {isFiltering && (
                <div className="shrink-0">
                    <button
                        type="button"
                        onClick={onClear}
                        className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}