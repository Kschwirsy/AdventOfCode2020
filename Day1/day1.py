#%%
with open("input.txt", "r") as f:
    for base in f:
        with open("input.txt", "r") as t:
            for option1 in t:
                with open("input.txt", "r") as t2:
                    for option2 in t2:
                        sum = int(base) + int(option1) + int(option2)
                        if sum == 2020:
                            print('The sum of {0} and {1} and {2} is {3}'.format(base, option1, option2, sum))
                            break
# %%