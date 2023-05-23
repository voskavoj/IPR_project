export function section_helper(name, options)
{
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
}
